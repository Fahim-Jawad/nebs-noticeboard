// utils/db.js

export function dbInit() {
  if (!localStorage.getItem("notices")) {
    localStorage.setItem("notices", JSON.stringify([]));
  }
}

// export async function fetchNotices(page = 1, limit = 20) {
//   const raw = localStorage.getItem("notices");
//   const all = raw ? JSON.parse(raw) : [];
//   return { items: all };
// }
export async function fetchNotices(page = 1, limit = 20) {
  await dbInit();

  const items = JSON.parse(localStorage.getItem("notices") || "[]");

  return {
    items,
    total: items.length,
    page,
    limit,
  };
}

export async function saveNotice(notice) {
  const raw = localStorage.getItem("notices");
  const all = raw ? JSON.parse(raw) : [];

  const id = Date.now();
  const newNotice = {
    id,
    published: false,
    ...notice,
  };

  all.push(newNotice);
  localStorage.setItem("notices", JSON.stringify(all));

  return newNotice;
}

export async function togglePublish(id) {
  const raw = localStorage.getItem("notices");
  const all = raw ? JSON.parse(raw) : [];

  const idx = all.findIndex((n) => n.id === id);
  if (idx === -1) return null;

  all[idx].published = !all[idx].published;
  localStorage.setItem("notices", JSON.stringify(all));

  return all[idx];
}
