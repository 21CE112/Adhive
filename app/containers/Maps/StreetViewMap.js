import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { SourceReader, PapperBlock } from 'dan-components';
import { StreetView } from './demos';
import Info from './Info';

function StreetViewMap() {
  const title = brand.name + ' - Map';
  const description = brand.desc;
  const docSrc = 'containers/Maps/demos/';
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock overflowX icon="ion-ios-cube-outline" title="StreetView" desc="View location in 3d perspective">
        <Info />
        <StreetView />
        <SourceReader componentName={docSrc + 'StreetView.js'} />
      </PapperBlock>
    </div>
  );
}

export default StreetViewMap;
