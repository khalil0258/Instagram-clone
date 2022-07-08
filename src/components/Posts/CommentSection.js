import React from "react";
import CommentBefore from "./CommentBefore";

function CommentSection(props) {
  return (
    <div className="px-3 pb-4">
      <CommentBefore name={props.userName} description={props.description} />

      <div className="text-left color-global text-sm pb-1 cursor-pointer">
        {/* in process */}
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
