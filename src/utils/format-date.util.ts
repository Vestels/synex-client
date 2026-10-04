export function formatDate(date: string | Date, short = false) {
  return new Date(date).toLocaleString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(short
      ? {}
      : {
          hour: '2-digit',
          minute: '2-digit',
        }),
  });
}
