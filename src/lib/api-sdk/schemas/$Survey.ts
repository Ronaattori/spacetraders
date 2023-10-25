/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Survey = {
    description: `A resource survey of a waypoint, detailing a specific extraction location and the types of resources that can be found there.`,
    properties: {
        signature: {
            type: 'string',
            description: `A unique signature for the location of this survey. This signature is verified when attempting an extraction using this survey.`,
            isRequired: true,
            minLength: 1,
        },
        symbol: {
            type: 'string',
            description: `The symbol of the waypoint that this survey is for.`,
            isRequired: true,
            minLength: 1,
        },
        deposits: {
            type: 'array',
            contains: {
                type: 'SurveyDeposit',
            },
            isRequired: true,
        },
        expiration: {
            type: 'string',
            description: `The date and time when the survey expires. After this date and time, the survey will no longer be available for extraction.`,
            isRequired: true,
            format: 'date-time',
        },
        size: {
            type: 'Enum',
            isRequired: true,
        },
    },
} as const;
