export class ChartUtils {
    /**
     * Number of ticks that should always be on axis.
     */
    static PERSISTING_TICKS_NUMBER = 2;

    /**
     * Calculates visible indexes for axis according to skip ratio and including first and
     * last ticks.
     * @param {number} tickCount number of ticks on the axis
     * @param {number} skipRatio interval according to which ticks should be skipped
     * @return {number[]} Array of ticks indexes that should be rendered
     */
    static calculateVisibleIndexes = (tickCount: number, skipRatio: number): number[] => {
        return [...Array(tickCount).keys()].filter(i => {
            const isLast = i === tickCount - 1;
            const isFirst = i === 0;
            const shouldSkipOneBeforeLast = i % skipRatio === 0 && i + skipRatio >= tickCount;
            const shouldSkip = (skipRatio > 1 && i % skipRatio > 0) || shouldSkipOneBeforeLast;
            return !shouldSkip || isLast || isFirst;
        });
    };

    /**
     * Determines whether to increase skip ratio based on visible ticks and skip ratio.
     * @param {number} skipRatio interval according to which ticks should be skipped
     * @param {number[]} visibleTicksIndexes Array of ticks indexes that should be rendered
     * @return {boolean} Whether to increase skip ratio
     */
    static shouldIncreaseSkipRatio = (skipRatio: number, visibleTicksIndexes: number[]): boolean => {
        const distanceBetweenLastTicks =
            visibleTicksIndexes[visibleTicksIndexes.length - 1] - visibleTicksIndexes[visibleTicksIndexes.length - 2];
        const incorrectLastTick = skipRatio === 1 && distanceBetweenLastTicks !== skipRatio;
        const increaseSkipRatio = distanceBetweenLastTicks - 1 !== skipRatio || incorrectLastTick;
        const evenlyDistributed =
            distanceBetweenLastTicks === skipRatio || visibleTicksIndexes.length === ChartUtils.PERSISTING_TICKS_NUMBER;

        return increaseSkipRatio && !evenlyDistributed;
    };
}
