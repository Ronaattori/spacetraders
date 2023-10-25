/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Extraction = {
    description: `Extraction details.`,
    properties: {
        shipSymbol: {
            type: 'string',
            description: `Symbol of the ship that executed the extraction.`,
            isRequired: true,
            minLength: 1,
        },
        yield: {
            type: 'ExtractionYield',
            description: `Yields from the extract operation.`,
            isRequired: true,
        },
    },
} as const;
