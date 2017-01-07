import * as React from 'react';
import { Tree, Row, Col } from 'antd';
const TreeNode = Tree.TreeNode;

export interface ImageSelectorProps {
  imageSelected: () => void;
  setExpandedKeys: (keys: string[]) => void;
  imgUrl?: string;
  selectedKeys: string[];
  expandedKeys: string[];
}

export function ImageSelector(props: ImageSelectorProps) {
  const [expandedKeys, setExpandedKeys] = React.useState(new Array<string>());
  React.useEffect(() => {
    setExpandedKeys(props.selectedKeys);
  });

  const onSelect = (selectedKeys: any[], info: any) => {
    if (selectedKeys.length && selectedKeys[0].indexOf('Accents') >= 0) {
      props.imageSelected();
    }
  };

  const onExpand = (expandedKeys: any) => {
    props.setExpandedKeys(expandedKeys);
  };

  return (
    <Row>
      <Col xs={24} sm={9} style={{ borderRight: 'solid 1px #ccc' }}>
        <div style={{ height: 400, overflow: 'scroll' }}>
          <Tree
            showLine
            selectedKeys={props.selectedKeys}
            expandedKeys={props.expandedKeys}
            onExpand={onExpand}
            onSelect={onSelect}
            style={{ maxWidth: 300 }}
          >
            <TreeNode title="High Resolution" key="0-0">
              <TreeNode title="Accents" key="0-0-0">
                <TreeNode title="2006-AC-18" key="Accents-0-0-0-0" />
                <TreeNode title="244-AT-1B" key="Accents-0-0-0-1" />
                <TreeNode title="244-AT-1C" key="Accents-0-0-0-2" />
                <TreeNode title="2000-AC-1A" key="Accents-0-0-0-3" />
                <TreeNode title="2000-AC-1A_Alt" key="Accents-0-0-0-4" />
                <TreeNode title="2000-AC-1B 2" key="Accents-0-0-0-5" />
                <TreeNode title="2001-AC-1A" key="Accents-0-0-0-6" />
                <TreeNode title="2001-AC-1A_Alt" key="Accents-0-0-0-7" />
                <TreeNode title="2003-AC-1A" key="Accents-0-0-0-8" />
                <TreeNode title="2003-AC-1A_Alt" key="Accents-0-0-0-9" />
                <TreeNode title="2003-AC-1B" key="Accents-0-0-0-10" />
                <TreeNode title="2003-AC-1B_Alt1" key="Accents-0-0-0-11" />
                <TreeNode title="2003-AC-1B_Alt2" key="Accents-0-0-0-12" />
                <TreeNode title="2004-AC-1B" key="Accents-0-0-0-13" />
              </TreeNode>
              <TreeNode title="Bedroom" key="Bedroom-0-0-0">
                <TreeNode title="2006-AC-18" key="Bedroom-0-0-0-0" />
                <TreeNode title="244-AT-1B" key="Bedroom-0-0-0-1" />
                <TreeNode title="244-AT-1C" key="Bedroom-0-0-0-2" />
                <TreeNode title="2000-AC-1A" key="Bedroom-0-0-0-3" />
                <TreeNode title="2000-AC-1A_Alt" key="Bedroom-0-0-0-4" />
                <TreeNode title="2000-AC-1B 2" key="Bedroom-0-0-0-5" />
                <TreeNode title="2001-AC-1A" key="Bedroom-0-0-0-6" />
                <TreeNode title="2001-AC-1A_Alt" key="Bedroom-0-0-0-7" />
                <TreeNode title="2003-AC-1A" key="Bedroom-0-0-0-8" />
                <TreeNode title="2003-AC-1A_Alt" key="Bedroom-0-0-0-9" />
                <TreeNode title="2003-AC-1B" key="Bedroom-0-0-0-10" />
                <TreeNode title="2003-AC-1B_Alt1" key="Bedroom-0-0-0-11" />
                <TreeNode title="2003-AC-1B_Alt2" key="Bedroom-0-0-0-12" />
                <TreeNode title="2004-AC-1B" key="Bedroom-0-0-0-13" />
              </TreeNode>
              <TreeNode title="Discontinued" key="Discontinued-0-0-0">
                <TreeNode title="2006-AC-18" key="Discontinued-0-0-0-0" />
                <TreeNode title="244-AT-1B" key="Discontinued-0-0-0-1" />
                <TreeNode title="244-AT-1C" key="Discontinued-0-0-0-2" />
                <TreeNode title="2000-AC-1A" key="Discontinued-0-0-0-3" />
                <TreeNode title="2000-AC-1A_Alt" key="Discontinued-0-0-0-4" />
                <TreeNode title="2000-AC-1B 2" key="Discontinued-0-0-0-5" />
                <TreeNode title="2001-AC-1A" key="Discontinued-0-0-0-6" />
                <TreeNode title="2001-AC-1A_Alt" key="Discontinued-0-0-0-7" />
                <TreeNode title="2003-AC-1A" key="Discontinued-0-0-0-8" />
                <TreeNode title="2003-AC-1A_Alt" key="Discontinued-0-0-0-9" />
                <TreeNode title="2003-AC-1B" key="Discontinued-0-0-0-10" />
                <TreeNode title="2003-AC-1B_Alt1" key="Discontinued-0-0-0-11" />
                <TreeNode title="2003-AC-1B_Alt2" key="Discontinued-0-0-0-12" />
                <TreeNode title="2004-AC-1B" key="Discontinued-0-0-0-13" />
              </TreeNode>
              <TreeNode title="Home Office" key="Home Office-0-0-0">
                <TreeNode title="2006-AC-18" key="Home Office-0-0-0-0" />
                <TreeNode title="244-AT-1B" key="Home Office-0-0-0-1" />
                <TreeNode title="244-AT-1C" key="Home Office-0-0-0-2" />
                <TreeNode title="2000-AC-1A" key="Home Office-0-0-0-3" />
                <TreeNode title="2000-AC-1A_Alt" key="Home Office-0-0-0-4" />
                <TreeNode title="2000-AC-1B 2" key="Home Office-0-0-0-5" />
                <TreeNode title="2001-AC-1A" key="Home Office-0-0-0-6" />
                <TreeNode title="2001-AC-1A_Alt" key="Home Office-0-0-0-7" />
                <TreeNode title="2003-AC-1A" key="Home Office-0-0-0-8" />
                <TreeNode title="2003-AC-1A_Alt" key="Home Office-0-0-0-9" />
                <TreeNode title="2003-AC-1B" key="Home Office-0-0-0-10" />
                <TreeNode title="2003-AC-1B_Alt1" key="Home Office-0-0-0-11" />
                <TreeNode title="2003-AC-1B_Alt2" key="Home Office-0-0-0-12" />
                <TreeNode title="2004-AC-1B" key="Home Office-0-0-0-13" />
              </TreeNode>
            </TreeNode>
            <TreeNode title="Sample Staging Area" key="1-0">
              <TreeNode title="Accents" key="1-0-0" />
              <TreeNode title="Bedroom" key="1-0-0" />
              <TreeNode title="Discontinued" key="1-0-0" />
              <TreeNode title="Home Office" key="1-0-0" />
            </TreeNode>

            <TreeNode title="Silo White Drops" key="2-0">
              <TreeNode title="Accents" key="2-0-0" />
              <TreeNode title="Bedroom" key="2-0-0" />
              <TreeNode title="Discontinued" key="2-0-0" />
              <TreeNode title="Home Office" key="2-0-0" />
            </TreeNode>

            <TreeNode title="Website Pics" key="3-0">
              <TreeNode title="Accents" key="3-0-0" />
              <TreeNode title="Bedroom" key="3-0-0" />
              <TreeNode title="Discontinued" key="3-0-0" />
              <TreeNode title="Home Office" key="3-0-0" />
            </TreeNode>
          </Tree>
        </div>
      </Col>
      <Col xs={24} sm={15} style={{ paddingLeft: '20px' }}>
        <img src={props.imgUrl} style={{ width: '100%' }} />
      </Col>
    </Row>
  );
}
