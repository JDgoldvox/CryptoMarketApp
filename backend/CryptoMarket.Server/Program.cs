using CryptoMarket.Endpoints;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

app.MapAccountEndpoints();

//app.MapGet("/", Endpoints.SayHello);
    // .WithName("Hello World") // Assigns an operation ID
    // .WithSummary("Short summary lol") // Provides a short summary for the endpoint
    // .WithDescription("This is a description") // Longer description
    // .WithTags("This is a tag") // Adds tags to categorize the endpoint
    // .WithBadge("Wtf is a badge")
    // .WithDisplayName("this is a display name")

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.Run();

// Define the class outside of the main execution flow
public static class Endpoints
{
    /// <summary> Cool name EP </summary>
    /// <tags> CoolEndpoints </tags>
    /// <info> There's some info here </info>
    public static string SayHello() => "Hello!";
}