import { EffectCallback, useLayoutEffect, useMemo, useRef } from 'react'

export function useEagerEffect(effect: EffectCallback, deps?: any[]) {
    const clearRef = useRef<ReturnType<EffectCallback>>()
    const prevDepsRef = useRef<any[]>()
    const prevDeps = prevDepsRef.current
    if (
        !deps ||
        !prevDeps ||
        (deps !== prevDeps && (deps.length !== prevDeps.length || prevDeps.some((v, i) => !Object.is(v, deps[i]))))
    ) {
        prevDepsRef.current = deps
        clearRef.current?.()
        clearRef.current = effect()
    }
    useLayoutEffect(() => () => clearRef.current?.(), [])
}
