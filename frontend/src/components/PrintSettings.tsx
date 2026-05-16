import { CreateJobPayload, PrintType } from "../types/job";

type PrintSettingsProps = {
  values: Omit<CreateJobPayload, "shopId" | "fileUrl">;
  onChange: (next: Omit<CreateJobPayload, "shopId" | "fileUrl">) => void;
};

export default function PrintSettings({ values, onChange }: PrintSettingsProps) {
  return (
    <div>
      <label>
        Print Type
        <select
          value={values.printType}
          onChange={(e) => onChange({ ...values, printType: e.target.value as PrintType })}
        >
          <option value="single">Single</option>
          <option value="duplex">Duplex</option>
        </select>
      </label>

      <label>
        Color Mode
        <input
          value={values.colorMode}
          onChange={(e) => onChange({ ...values, colorMode: e.target.value })}
        />
      </label>

      <label>
        Copies
        <input
          type="number"
          min={1}
          value={values.copies}
          onChange={(e) => onChange({ ...values, copies: Number(e.target.value) })}
        />
      </label>

      <label>
        Page Range
        <input
          value={values.pageRange}
          onChange={(e) => onChange({ ...values, pageRange: e.target.value })}
        />
      </label>
    </div>
  );
}
