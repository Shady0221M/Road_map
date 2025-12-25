"use client";

import { useState } from "react";
import { ContentRow } from "@/src/types/content";
import EditConceptDialog from "./dialogs/EditConceptDialog";

function getYouTubeThumbnail(url?: string) {
  if (!url) return null;

  try {
    const u = new URL(url);
    const id =
      u.searchParams.get("v") ||
      u.pathname.split("/").pop();

    if (!id) return null;

    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  } catch {
    return null;
  }
}

interface Props {
  row: ContentRow;
  refresh: () => void;
  draggableIndex: number;
  onMove: (from: number, to: number) => void;
}

export default function ConceptItem({
  row,
  refresh,
  draggableIndex,
  onMove,
}: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(row.concept);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const thumbnail = getYouTubeThumbnail(row.video_url);

  return (
    <>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "text/plain",
            draggableIndex.toString()
          );
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const from = Number(
            e.dataTransfer.getData("text/plain")
          );
          onMove(from, draggableIndex);
        }}
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          cursor: "grab",
        }}
        onClick={() => {
          if (!isRenaming) setShowEditDialog(true);
        }}
      >
        {/* LEFT: Concept name */}
        <div style={{ flex: 1 }}>
          {isRenaming ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  if (!name || name === row.concept) {
                    setIsRenaming(false);
                    return;
                  }

                  await fetch("/api/content/update", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: row.id,
                      concept: name,
                    }),
                  });

                  setIsRenaming(false);
                  refresh();
                }
              }}
            />
          ) : (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
              }}
              style={{ cursor: "text", fontWeight: 500 }}
            >
              {row.concept}
            </span>
          )}
        </div>

        {/* RIGHT: Video info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={(e) => e.stopPropagation()}
        >

          <div style={{ textAlign: "right" }}>
            
            <a
              href={row.video_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "11px" }}
            >
              {thumbnail && (
            <img
              src={thumbnail}
              alt="video thumbnail"
              width={80}
              style={{ borderRadius: "4px" }}
            />
          )}
            </a>
          </div>

          <button
            onClick={async () => {
              const ok = confirm("Delete this concept?");
              if (!ok) return;

              await fetch(`/api/content/delete?id=${row.id}`, {
                method: "DELETE",
              });

              refresh();
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <EditConceptDialog
        open={showEditDialog}
        row={row}
        onClose={() => setShowEditDialog(false)}
        onSaved={async ({
          id,
          concept,
          video_title,
          video_url,
        }: {
          id: number;
          concept: string;
          video_title: string;
          video_url: string;
        }) => {
          await fetch("/api/content/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id,
              concept,
              video_title,
              video_url,
            }),
          });

          setShowEditDialog(false);
          refresh();
        }}
      />
    </>
  );
}
