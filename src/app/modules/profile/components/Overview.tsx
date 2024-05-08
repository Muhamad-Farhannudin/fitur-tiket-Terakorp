import { Content } from '../../../../_metronic/layout/components/content'
import {
  FeedsWidgetFinal,
} from '../../../../_metronic/partials/widgets'
import { Fade } from 'react-reveal';

export function Overview() {
  return (
    <Fade left>
    <Content>

      <div className='row g-5 g-xxl-8' style={{ marginTop: "50px" }}>
        <div className="col-xl-6">
          <FeedsWidgetFinal link1={'/overview/rs1/projectRS1'} children={"RS Al Islam Bandung"} className='mb-5 mb-xxl-8' />
        </div>
      </div>

    </Content>
    </Fade>
  )
}
