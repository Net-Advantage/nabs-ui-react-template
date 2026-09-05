using FluentValidation;

namespace NabsPrefix.Dtos;

public class WeatherRequestValidator : AbstractValidator<WeatherRequest>
{
    public WeatherRequestValidator()
    {
        RuleFor(x => x.Days)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Days cannot be less than 0.")
            .LessThanOrEqualTo(21)
            .WithMessage("Days cannot be greater than 21.");

        RuleFor(x => x.Days)
            .GreaterThan(7)
            .WithSeverity(Severity.Warning)
            .WithMessage("Days greater than 7 may be less accurate.")
            .When(x => x.Days <= 21);
    }
}
