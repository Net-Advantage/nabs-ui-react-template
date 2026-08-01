# nabs-api-builder

Quick guide for the API endpoint scaffold skill.

This skill scaffolds single-file ASP.NET Core endpoints using `Nabs.Launchpad.Core.Apis` and ensures endpoint discovery is wired in `Program.cs`.

## Use this when

1. You want to add a new API endpoint in `src/NabsPrefix.Api`.
2. You want endpoint-per-file structure instead of controller action growth.
3. You want endpoint metadata (`EndpointName`, `Tags`, `Summary`) and OpenAPI-compatible routing.

## Inputs

1. `domain`
2. `httpMethod`
3. `routeTemplate`
4. `endpointName` (optional)
5. `requestShape` (optional)
6. `responseShape` (optional)

## Required conventions

1. Endpoint must be created only in an ASP.NET Web API project ending with `.Api`.
2. Endpoint file path must be `/Endpoints/<Domain>Endpoints/`.
3. Endpoint class name must be `<HttpVerb><Domain>Endpoint`.

## Source of truth

All detailed rules, templates, and completion checks are maintained in:

1. `SKILL.md`
2. `../../prompts/nabs-api-builder.prompt.md`

Keep this README concise and update only those files for behavior changes.
