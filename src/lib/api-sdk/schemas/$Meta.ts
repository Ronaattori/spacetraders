/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Meta = {
    description: `Meta details for pagination.`,
    properties: {
        total: {
            type: 'number',
            description: `Shows the total amount of items of this kind that exist.`,
            isRequired: true,
        },
        page: {
            type: 'number',
            description: `A page denotes an amount of items, offset from the first item. Each page holds an amount of items equal to the \`limit\`.`,
            isRequired: true,
            minimum: 1,
        },
        limit: {
            type: 'number',
            description: `The amount of items in each page. Limits how many items can be fetched at once.`,
            isRequired: true,
            maximum: 20,
            minimum: 1,
        },
    },
} as const;
