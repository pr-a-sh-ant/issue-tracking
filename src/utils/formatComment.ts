import { Comment } from "../proto/issue/Comment";

interface NestedComment extends Comment {
  replies: Comment[];
}

function formatComments(comments: Comment[]): NestedComment[] {
  const map = new Map<string, NestedComment>();
  const roots: NestedComment[] = [];

  for (const comment of comments) {
    const extended: NestedComment = {
      ...comment,
      replies: [],
    };
    if (extended.id) {
      map.set(extended.id, extended);
    }
  }

  // Build the tree
  for (const comment of map.values()) {
    if (comment.parentId && map.has(comment.parentId)) {
      map.get(comment.parentId)!.replies!.push(comment);
    } else {
      roots.push(comment);
    }
  }

  return roots;
}

export default formatComments;
