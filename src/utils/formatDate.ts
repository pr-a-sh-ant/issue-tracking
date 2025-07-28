const formatListDate = (dates: string[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  const now = new Date();
  // Calculate the earliest month to include (7 months ago)
  const earliest = new Date(now.getFullYear(), now.getMonth() - 6, 1); // 6 because current month is included

  // Initialize all months in the last 7 months with 0
  for (let i = 0; i < 7; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;
    counts[key] = 0;
  }

  dates.forEach((dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return; // skip invalid dates
    // Only count if date is within the last 7 months
    if (d < earliest) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
};

export default formatListDate;
