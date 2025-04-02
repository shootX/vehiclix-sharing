using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Vehiclix.API.Data.Migrations;

public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Users",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                Role = table.Column<int>(type: "integer", nullable: false),
                Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                PasswordHash = table.Column<string>(type: "text", nullable: false),
                ApiKey = table.Column<string>(type: "text", nullable: true),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                CreatedBy = table.Column<string>(type: "text", nullable: true),
                UpdatedBy = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Users", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Vehicles",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                VIN = table.Column<string>(type: "character varying(17)", maxLength: 17, nullable: false),
                LicensePlate = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                Brand = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                Model = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                Year = table.Column<int>(type: "integer", nullable: false),
                Status = table.Column<int>(type: "integer", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                CreatedBy = table.Column<string>(type: "text", nullable: true),
                UpdatedBy = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Vehicles", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Claims",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                ClaimId = table.Column<string>(type: "text", nullable: false),
                VehicleId = table.Column<int>(type: "integer", nullable: false),
                Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                Description = table.Column<string>(type: "text", nullable: false),
                Amount = table.Column<decimal>(type: "numeric", nullable: false),
                Photos = table.Column<List<string>>(type: "text[]", nullable: false),
                Status = table.Column<int>(type: "integer", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                CreatedBy = table.Column<string>(type: "text", nullable: true),
                UpdatedBy = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Claims", x => x.Id);
                table.ForeignKey(
                    name: "FK_Claims_Vehicles_VehicleId",
                    column: x => x.VehicleId,
                    principalTable: "Vehicles",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Fines",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                VehicleId = table.Column<int>(type: "integer", nullable: false),
                FineId = table.Column<string>(type: "text", nullable: false),
                Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                Description = table.Column<string>(type: "text", nullable: false),
                Amount = table.Column<decimal>(type: "numeric", nullable: false),
                Status = table.Column<int>(type: "integer", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                CreatedBy = table.Column<string>(type: "text", nullable: true),
                UpdatedBy = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Fines", x => x.Id);
                table.ForeignKey(
                    name: "FK_Fines_Vehicles_VehicleId",
                    column: x => x.VehicleId,
                    principalTable: "Vehicles",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Reports",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Type = table.Column<int>(type: "integer", nullable: false),
                Parameters = table.Column<Dictionary<string, string>>(type: "jsonb", nullable: false),
                Data = table.Column<object>(type: "jsonb", nullable: true),
                Status = table.Column<int>(type: "integer", nullable: false),
                Error = table.Column<string>(type: "text", nullable: true),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                CreatedBy = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Reports", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "ApiLogs",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Endpoint = table.Column<string>(type: "text", nullable: false),
                Method = table.Column<string>(type: "text", nullable: false),
                RequestBody = table.Column<string>(type: "text", nullable: true),
                ResponseBody = table.Column<string>(type: "text", nullable: true),
                StatusCode = table.Column<int>(type: "integer", nullable: false),
                UserId = table.Column<string>(type: "text", nullable: true),
                IpAddress = table.Column<string>(type: "text", nullable: true),
                Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                Duration = table.Column<long>(type: "bigint", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_ApiLogs", x => x.Id);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Claims_VehicleId",
            table: "Claims",
            column: "VehicleId");

        migrationBuilder.CreateIndex(
            name: "IX_Fines_VehicleId",
            table: "Fines",
            column: "VehicleId");

        migrationBuilder.CreateIndex(
            name: "IX_Users_Email",
            table: "Users",
            column: "Email",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_Vehicles_VIN",
            table: "Vehicles",
            column: "VIN",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_Vehicles_LicensePlate",
            table: "Vehicles",
            column: "LicensePlate",
            unique: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "ApiLogs");

        migrationBuilder.DropTable(
            name: "Reports");

        migrationBuilder.DropTable(
            name: "Claims");

        migrationBuilder.DropTable(
            name: "Fines");

        migrationBuilder.DropTable(
            name: "Vehicles");

        migrationBuilder.DropTable(
            name: "Users");
    }
} 