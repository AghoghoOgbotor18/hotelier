import FieldLabel from './FieldLabel';

export default function CountField({ label, value, onChange, options, lastField = false }) {
    return (
        <label
        className={`flex flex-col gap-1.5 ${
            lastField ? 'lg:px-5 lg:py-2' : 'lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2'
        }`}
        >
            <FieldLabel>{label}</FieldLabel>
            <select
                value={value}
                onChange={onChange}
                className="bg-transparent font-sans text-sm text-ivory outline-none"
            >
                {options.map((n) => (
                <option key={n} value={n} className="bg-ink text-ivory">
                    {String(n).padStart(2, '0')}
                </option>
                ))}
            </select>
        </label>
    );
}