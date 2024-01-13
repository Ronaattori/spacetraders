/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SurveyDeposit } from './SurveyDeposit';
/**
 * A resource survey of a waypoint, detailing a specific extraction location and the types of resources that can be found there.
 */
export type Survey = {
    /**
     * A unique signature for the location of this survey. This signature is verified when attempting an extraction using this survey.
     */
    signature: string;
    /**
     * The symbol of the waypoint that this survey is for.
     */
    symbol: string;
    /**
     * A list of deposits that can be found at this location. A ship will extract one of these deposits when using this survey in an extraction request. If multiple deposits of the same type are present, the chance of extracting that deposit is increased.
     */
    deposits: Array<SurveyDeposit>;
    /**
     * The date and time when the survey expires. After this date and time, the survey will no longer be available for extraction.
     */
    expiration: string;
    /**
     * The size of the deposit. This value indicates how much can be extracted from the survey before it is exhausted.
     */
    size: Survey.size;
};
export namespace Survey {
    /**
     * The size of the deposit. This value indicates how much can be extracted from the survey before it is exhausted.
     */
    export enum size {
        SMALL = 'SMALL',
        MODERATE = 'MODERATE',
        LARGE = 'LARGE',
    }
}

