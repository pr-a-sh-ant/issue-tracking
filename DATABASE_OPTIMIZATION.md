# Database Optimization Recommendations

This document outlines recommended database indexes and optimizations for improved performance.

## Recommended Indexes

### Issues Table

```sql
-- Index for filtering by status (used in dashboardIssues and listing)
CREATE INDEX idx_issues_status ON issues(status);

-- Index for filtering by created_by (used in user queries)
CREATE INDEX idx_issues_created_by ON issues(created_by);

-- Index for filtering by admin_id (used in admin queries)
CREATE INDEX idx_issues_admin_id ON issues(admin_id);

-- Index for filtering by priority (used in filtering)
CREATE INDEX idx_issues_priority ON issues(priority);

-- Composite index for common query patterns
CREATE INDEX idx_issues_created_by_status ON issues(created_by, status);
CREATE INDEX idx_issues_admin_id_status ON issues(admin_id, status);

-- Index for ordering by created_at
CREATE INDEX idx_issues_created_at ON issues(created_at DESC);
```

### Comments Table

```sql
-- Index for filtering by issue_id (used in getIssue)
CREATE INDEX idx_comment_issue_id ON comment(issue_id);

-- Index for filtering by user_id
CREATE INDEX idx_comment_user_id ON comment(user_id);

-- Index for parent_id (for threaded comments)
CREATE INDEX idx_comment_parent_id ON comment(parent_id);
```

### Audit Logs Table

```sql
-- Index for filtering by issue_id
CREATE INDEX idx_audit_logs_issue_id ON audit_logs(issue_id);

-- Index for ordering by log_date
CREATE INDEX idx_audit_logs_log_date ON audit_logs(log_date DESC);

-- Index for filtering by user_id
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
```

### Users Table

```sql
-- Index for authentication queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Index for role-based queries
CREATE INDEX idx_users_role ON users(role);
```

## Performance Improvements Made

### 1. Eliminated N+1 Query in dashboardIssues (User Role)
- **Before**: Executed 2 separate queries - one for counts and one for created_at list
- **After**: Combined into a single query using GROUP_CONCAT
- **Impact**: ~50% reduction in database round trips for user dashboard

### 2. Optimized dashboardIssues (Admin Role)
- **Before**: Used unnecessary subquery for NEW issues count
- **After**: Combined all counts into conditional aggregations
- **Impact**: Reduced from multiple table scans to a single scan

### 3. Optimized dashboardIssues (Superadmin Role)
- **Before**: Used 3 separate subqueries, each scanning the entire table
- **After**: Single query with conditional aggregations
- **Impact**: ~66% reduction in table scans

### 4. Fixed WHERE Clause Logic
- **Before**: `if (priority || priority !== "")` - always true due to OR operator
- **After**: `if (priority && priority !== "")` - correct validation
- **Impact**: Prevents unnecessary query parameters and potential SQL errors

### 5. Optimized Comment Creation Query
- **Before**: Used EXISTS subquery to check admin role
- **After**: Used LEFT JOIN for more efficient role checking
- **Impact**: Eliminates correlated subquery overhead

### 6. Database Connection Pool Improvements
- **Before**: connectionLimit: 10
- **After**: connectionLimit: 20 with keepAlive enabled
- **Impact**: Better concurrency handling and connection reuse

### 7. Removed Debug Logging
- Removed console.log statements from production code paths
- **Impact**: Reduced I/O overhead and improved performance

## Query Optimization Best Practices Applied

1. **Avoid N+1 Queries**: Combine related queries into single queries using JOINs or aggregations
2. **Use Indexes**: Ensure all frequently filtered columns have appropriate indexes
3. **Minimize Subqueries**: Replace correlated subqueries with JOINs where possible
4. **Optimize ORDER BY**: Place ORDER BY before LIMIT/OFFSET for better performance
5. **Connection Pooling**: Use appropriate pool sizes for expected concurrency
6. **Conditional Aggregation**: Use CASE WHEN in COUNT/SUM instead of multiple queries

## Monitoring Recommendations

1. Enable MySQL slow query log to identify problematic queries
2. Use EXPLAIN to analyze query execution plans
3. Monitor connection pool utilization
4. Track query response times in application logs
5. Set up alerts for connection pool exhaustion

## Additional Optimization Opportunities

1. **Redis Caching**: Consider caching frequently accessed data like dashboard counts
2. **Read Replicas**: For read-heavy workloads, consider MySQL read replicas
3. **Prepared Statements**: Some queries could benefit from prepared statement caching
4. **Batch Operations**: For bulk operations, use batch inserts/updates
5. **Database Partitioning**: For very large tables, consider partitioning by date

## Implementation Priority

1. **High Priority**: Add indexes on frequently queried columns (status, created_by, admin_id)
2. **Medium Priority**: Implement Redis caching for dashboard data
3. **Low Priority**: Consider read replicas if read traffic increases significantly
