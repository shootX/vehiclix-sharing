FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["src/Vehiclix.API/Vehiclix.API.csproj", "src/Vehiclix.API/"]
RUN dotnet restore "src/Vehiclix.API/Vehiclix.API.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "src/Vehiclix.API/Vehiclix.API.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "src/Vehiclix.API/Vehiclix.API.csproj" -c Release -o /app/publish

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Vehiclix.API.dll"] 