import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";

import { StudyGuide } from "@/bigbistudio/components/DesignSystem";

export default function StyleGuidePage() {
  return (
    <Page className="pt-2.5 md:pt-10">
      <Container>
        <Sections className="gap-5">
          <StudyGuide />
        </Sections>
      </Container>
    </Page>
  );
}
