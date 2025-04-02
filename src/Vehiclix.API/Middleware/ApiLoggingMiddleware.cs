using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IO;
using Sentry;
using Vehiclix.API.Data;
using Vehiclix.API.Models;

namespace Vehiclix.API.Middleware;

public class ApiLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ApiLoggingMiddleware> _logger;
    private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;
    private readonly RecyclableMemoryStreamManager _streamManager;

    public ApiLoggingMiddleware(
        RequestDelegate next,
        ILogger<ApiLoggingMiddleware> logger,
        IDbContextFactory<ApplicationDbContext> contextFactory,
        RecyclableMemoryStreamManager streamManager)
    {
        _next = next;
        _logger = logger;
        _contextFactory = contextFactory;
        _streamManager = streamManager;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // Log request
            var requestBody = await GetRequestBody(context.Request);
            var originalBodyStream = context.Response.Body;

            await using var responseBody = _streamManager.GetStream();
            context.Response.Body = responseBody;

            await _next(context);

            // Log response
            var responseContent = await GetResponseBody(context.Response);
            context.Response.Body = originalBodyStream;

            await responseBody.CopyToAsync(originalBodyStream);

            // Save log to database using a new context
            await using var dbContext = await _contextFactory.CreateDbContextAsync();
            var log = new ApiLog
            {
                Endpoint = context.Request.Path,
                Method = context.Request.Method,
                RequestBody = requestBody,
                ResponseBody = responseContent,
                StatusCode = context.Response.StatusCode,
                UserId = context.User.Identity?.Name,
                IpAddress = context.Connection.RemoteIpAddress?.ToString(),
                Timestamp = DateTime.UtcNow,
                Duration = 0 // We'll need to implement proper duration tracking
            };

            await dbContext.ApiLogs.AddAsync(log);
            await dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while logging API request");
            throw;
        }
    }

    private static async Task<string> GetRequestBody(HttpRequest request)
    {
        request.EnableBuffering();

        using var reader = new StreamReader(
            request.Body,
            encoding: System.Text.Encoding.UTF8,
            detectEncodingFromByteOrderMarks: false,
            leaveOpen: true);

        var body = await reader.ReadToEndAsync();
        request.Body.Position = 0;

        return body;
    }

    private static async Task<string> GetResponseBody(HttpResponse response)
    {
        response.Body.Position = 0;
        var reader = new StreamReader(response.Body);
        var text = await reader.ReadToEndAsync();
        response.Body.Position = 0;

        return text;
    }
} 