import { Content } from "../../../../_metronic/layout/components/content";
import { FeedsWidget9 } from "../../../../_metronic/partials/widgets";
import { Fade } from "react-reveal";
export function Overview3() {
  return (
    <Fade left>
      <Content>
        <div className="row g-5 g-xxl-8" style={{ marginTop: "50px" }}>
          <div className="col-xl-6">
            <FeedsWidget9 className="mb-5 mb-xxl-8" />
          </div>
        </div>
      </Content>
    </Fade>
  );
}
