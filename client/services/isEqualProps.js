import isEqual from "lodash.isequal";

export function isEqualProps(previousProps, nextProps) {
    if (previousProps.data && nextProps.data) {
        return isEqual(previousProps.data, nextProps.data)
    }
}