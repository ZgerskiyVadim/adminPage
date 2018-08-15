import isEqual from "lodash.isequal";

export function isEqualProps(previousProps, nextProps) {
    return isEqual(previousProps, nextProps);
}