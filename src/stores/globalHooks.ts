import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, Store, RootState } from './globalStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useGlobalDispatch = useDispatch.withTypes<AppDispatch>()
export const useGlobalSelector = useSelector.withTypes<RootState>()
export const useGlobalStore = useStore.withTypes<typeof Store>()
