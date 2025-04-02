param(
    [Parameter(Mandatory=$true)]
    [string]$MigrationName
)

dotnet ef migrations add $MigrationName --project src/Vehiclix.API/Vehiclix.API.csproj --startup-project src/Vehiclix.API/Vehiclix.API.csproj 