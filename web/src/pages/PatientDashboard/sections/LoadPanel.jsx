const items = [
    { label: "قسم الأشعة", value: 85, color: "red" },
    { label: "المختبر المركزي", value: 40, color: "green" },
    { label: "عيادات القلب", value: 65, color: "orange" },
];

export default function LoadPanel() {
    return (
        <div className="card">
        <div style={{ padding: 18 }}>
            <h3 className="lp__title">إشغال المرافق</h3>

            {items.map((it) => (
            <div key={it.label} className="lp__row">
                <div className="lp__head">
                    <div className="lp__name">{it.label}</div>
                    <div className="lp__pct">{it.value}%</div>
                </div>

                <div className="lp__bar">
                    <div
                    className={`lp__fill lp__fill--${it.color}`}
                    style={{ width: `${it.value}%` }}
                    />
                </div>
            </div>
            ))}

            <button className="lp__link" type="button">
            تحدث مباشرة من الأقسام <span aria-hidden="true">↗</span>
            </button>
        </div>
        </div>
    );
}
