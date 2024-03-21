import { MaxWidth } from "@/components/max-width";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <MaxWidth className="py-6">
          <div className="h-10 w-10 rounded-lg bg-primary"></div>
        </MaxWidth>
      </header>
      <div>{children}</div>
    </div>
  );
}
