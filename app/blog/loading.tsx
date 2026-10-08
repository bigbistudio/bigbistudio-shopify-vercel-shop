import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <Page className="pt-2.5 md:pt-10">
      <Container>
        <Sections>
          <div
            aria-hidden="true"
            className="mx-auto grid w-full max-w-2xl justify-items-center gap-4"
          >
            <Skeleton className="h-4 w-32 rounded-none" />
            <Skeleton className="h-10 w-56 rounded-none sm:w-72" />
            <Skeleton className="h-5 w-full max-w-xl rounded-none" />
          </div>
          <div
            aria-hidden="true"
            className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <div className="grid gap-4" key={index}>
                <Skeleton className="aspect-3/2 rounded-none" />
                <Skeleton className="h-4 w-28 rounded-none" />
                <Skeleton className="h-6 w-3/4 rounded-none" />
              </div>
            ))}
          </div>
        </Sections>
      </Container>
    </Page>
  );
}
