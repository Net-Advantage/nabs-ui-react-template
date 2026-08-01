---
name: nabs-api-builder
description: Scaffold a single-file ASP.NET Core endpoint using Nabs.Launchpad.Core.Apis and wire endpoint discovery into Program.cs.
---

# nabs-api-builder

Use this skill when the user asks to add a new API endpoint in this repository.

This skill must follow `Nabs.Launchpad.Core.Apis` endpoint abstractions (`NabsEndpointBase`, `NabsEndpointOptions`, and startup registration through `MapNabsEndpoints(...)`) instead of adding controller actions.

## Authoritative constraints

These constraints are mandatory and are the source of truth for endpoint location and naming:

1. Endpoints can only be created in an ASP.NET Web API project whose name ends with `.Api`.
2. Endpoint files must be under `/Endpoints/<Domain>Endpoints/` in that `.Api` project.
3. Endpoint class names must be `<HttpVerb><Domain>Endpoint`.
4. `domain` is required input and drives both folder name and class naming.

## Inputs

1. `domain`: Domain token used for folder and class naming (example: `Products`).
2. `httpMethod`: `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
3. `routeTemplate`: Route path (example: `/api/products/{id:guid}`).
4. `endpointName` (optional): Human-friendly endpoint name for metadata.
5. `requestShape` (optional): Request DTO fields for write operations.
6. `responseShape` (optional): Response fields.
7. `tags` (optional): OpenAPI tags. Default to `domain`.
8. `summary` (optional): OpenAPI summary.

## Repository conventions (must follow)

1. Endpoint creation is allowed only in an ASP.NET Web API project whose name ends with `.Api`.
2. In this repository, that project is `src/NabsPrefix.Api`.
3. Endpoint files live in `/Endpoints/<Domain>Endpoints/`.
4. One endpoint class per file.
5. Endpoint class names must be `<HttpVerb><Domain>Endpoint` (example: `GetProductsEndpoint`).
6. DTOs for endpoint-specific request/response stay close to the endpoint unless reused broadly.
7. Startup wiring stays in the selected `.Api` project's `Program.cs`.

## Rules

1. Do not add MVC controllers for new endpoint behavior.
2. Implement endpoint classes using `NabsEndpointBase` and `NabsEndpointOptions`.
3. Configure endpoint metadata in options:
   - `EndpointName`
   - `Tags`
   - `Summary`
4. Implement `HandleAsync(HttpContext httpContext, CancellationToken cancellationToken)` and return `IResult`.
5. Keep route paths under `/api` unless user explicitly asks for another prefix.
6. Ensure `Program.cs` calls `MapNabsEndpoints(...)` so endpoints are discovered and mapped.
7. Keep OpenAPI and service defaults behavior in `Program.cs` intact.
8. Follow existing code style and nullable conventions in this repository.
9. Always require `domain` input and use it for both folder and endpoint class naming.

## Generation workflow

1. Validate target project:
   - Must be ASP.NET Web API and project name must end with `.Api`.
2. Normalize naming:
   - `domain`: PascalCase domain token from user input (example `Products`).
   - `httpVerbToken`: PascalCase HTTP verb (`Get`, `Post`, `Put`, `Patch`, `Delete`).
   - `endpointToken`: `<HttpVerbToken><Domain>Endpoint` (example `GetProductsEndpoint`).
3. Create endpoint file under:
   - `/Endpoints/<Domain>Endpoints/<EndpointToken>.cs` inside the selected `.Api` project.
4. Build endpoint options with route and method:
   - `new NabsEndpointOptions("/api/...", HttpMethod.Get|Post|Put|Patch|Delete)`
5. Add request parsing/validation in `HandleAsync` as required by method type.
6. Return appropriate minimal API result (`Results.Ok`, `Results.Created`, `Results.NoContent`, `Results.BadRequest`, etc.).
7. Register endpoint discovery in `Program.cs` by invoking `MapNabsEndpoints(...)` once during app startup.
8. Preserve existing `MapDefaultEndpoints()`, static file hosting, and OpenAPI wiring.

## Endpoint template

Use this shape for generated endpoints:

```csharp
public sealed class GetProductsEndpoint : NabsEndpointBase
{
	public GetProductsEndpoint()
		: base(new NabsEndpointOptions("/api/products/{id:guid}", HttpMethod.Get)
		{
			EndpointName = "GetProducts",
			Tags = ["Products"],
			Summary = "Get a product by id."
		})
	{
	}

	protected override Task<IResult> HandleAsync(HttpContext httpContext, CancellationToken cancellationToken)
	{
		var id = httpContext.GetRouteValue("id");
		return Task.FromResult<IResult>(Results.Ok(new { id }));
	}
}
```

## Completion checklist

1. Endpoint file created in the expected `/Endpoints/<Domain>Endpoints` folder under a `.Api` project.
2. `Program.cs` includes endpoint discovery mapping through `MapNabsEndpoints(...)`.
3. Solution builds successfully.
4. Endpoint appears in OpenAPI in development.
