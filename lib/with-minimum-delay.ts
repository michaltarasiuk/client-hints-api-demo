export async function withMinimumDelay<T>(
  promise: Promise<T>,
  minimumMs: number,
): Promise<T> {
  const [result] = await Promise.all([
    promise,
    new Promise<void>((resolve) => {
      setTimeout(resolve, minimumMs);
    }),
  ]);
  return result;
}
