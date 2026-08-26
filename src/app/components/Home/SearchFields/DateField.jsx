import FieldLabel from './FieldLabel';

export default function DateField({ label, value, onChange, min }) {
    return (
        <label className="flex flex-col gap-1.5 lg:flex-1 lg:border-r lg:border-ivory/10 lg:px-5 lg:py-2">
            <FieldLabel>{label}</FieldLabel>
            <input
                type="date"
                required
                min={min}
                value={value}
                onChange={onChange}
                className="appearance-auto bg-transparent font-sans text-sm text-ivory outline-none [color-scheme:dark]"
            />
        </label>
    );
}