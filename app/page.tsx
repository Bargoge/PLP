"use client";

export default function Home() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('/api/inputs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {

    } else {

    }
  };
  return (
    <main className="h-screen">
      <div className="mt-24 p-10">
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-2 max-w-lg">
          <fieldset className="contents">
            <div className="flex flex-col">
              <label htmlFor="input" className="font-semibold text-lg">Enter product
                description
              </label>
              <textarea name="input" id="input" rows={5} maxLength={256} required={true}
                placeholder="Eg. A new and innovative water bottle that keeps drinks cold for 24 hours. [Max 256 chars]"
                className="rounded-lg p-4 bg-black/5 border-2 border-solid border-gray-800 font-mono font-medium text-sm"></textarea>
            </div>
            <button type="submit"
              className="rounded-lg p-3 bg-green-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-green-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd"
                  d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                  clipRule="evenodd"></path>
              </svg>
              <span className="font-bold">Generate title now!</span>
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}