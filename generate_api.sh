docker run --rm -v "${PWD}":/local openapitools/openapi-generator-cli generate \
-i https://raw.githubusercontent.com/SpaceTradersAPI/api-docs/main/reference/SpaceTraders.json \
-o /local/src/lib/spacetraders-sdk \
-g typescript-axios \
--additional-properties=npmName="spacetraders-sdk" \
--additional-properties=npmVersion="2.0.0" \
--additional-properties=supportsES6=true \
--additional-properties=withSeparateModelsAndApi=true \
--additional-properties=modelPackage="models" \
--additional-properties=apiPackage="api"
