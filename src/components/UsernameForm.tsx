import { useState } from "react";

interface UsernameFormPrompts {
    onSubmit: (name: string) => void
}

export default function UsernameForm({ onSubmit } : UsernameFormPrompts) {
  const [name, setName] = useState("");

  function submit() {
    const trimmed = name.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
    }
  }

  return (
    <div>
      <input
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Enter username"
      />

      <button className="btn username" disabled={!name.trim()} onClick={submit}>
        Continue
      </button>
    </div>
  );
}
