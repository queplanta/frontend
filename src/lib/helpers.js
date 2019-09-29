export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function isBrowser() {
  return typeof window !== 'undefined'
}