import { Content } from "../../../../_metronic/layout/components/content";
import { FeedsWidget8 } from "../../../../_metronic/partials/widgets";
import { Fade } from "react-reveal";
export function Overview2() {
  return (
    <Fade left>
      <Content>
        <div className="row g-5 g-xxl-8" style={{ marginTop: "50px" }}>
          <div className="col-xl-6">
            <FeedsWidget8 className="mb-5 mb-xxl-8" />
          </div>
        </div>
      </Content>
    </Fade>
  );
}
