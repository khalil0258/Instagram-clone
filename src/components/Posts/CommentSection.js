import React from "react";
import CommentBefore from "./CommentBefore";

function CommentSection() {
  return (
    <div className="px-3 pb-4">
      <CommentBefore name="khalil___hjz" description="jfhdhfkjdshfh" />

      <div className="text-left color-global text-sm pb-1 cursor-pointer">
        voir les 33 commentaires
      </div>
      <div>
        <CommentBefore
          name="khalil___hjz"
          description="jfhdhfkjdshfh"
          inComment={true}
        />
        <CommentBefore
          name="khalil___hjz"
          description="jfhdhfkjdshfh"
          inComment={true}
        />
      </div>
    </div>
  );
}

export default CommentSection;
