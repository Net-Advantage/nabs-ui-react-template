using Ardalis.Result;
using NabsPrefix.Dtos;

namespace NabsPrefix.Domain;

public class WeatherService
{
    private static readonly string[] Summaries =
    [
        "Freezing",
        "Bracing",
        "Chilly",
        "Cool",
        "Mild",
        "Warm",
        "Balmy",
        "Hot",
        "Sweltering",
        "Scorching"
    ];

    public Task<Result<WeatherForecast[]>> GetWeatherForecast(WeatherRequest request)
    {
        var validator = new WeatherRequestValidator();
        var validationResult = validator.Validate(request);
        if (!validationResult.IsValid)
        {
            var validationErrors = validationResult.Errors
                .Select(error => new ValidationError
                {
                    Identifier = error.PropertyName,
                    ErrorMessage = error.ErrorMessage
                })
                .ToList();

            return Task.FromResult(Result<WeatherForecast[]>.Invalid(validationErrors));
        }

        var forecast = Enumerable.Range(1, request.Days)
            .Select(index => new WeatherForecast(
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]))
            .ToArray();

        return Task.FromResult(Result.Success(forecast));
    }
}
