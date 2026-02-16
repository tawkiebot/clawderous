import { ArcDiagram } from '@arach/arc'
import type { ArcDiagramData } from '@arach/arc'

const diagramData: ArcDiagramData = {
  layout: { width: 900, height: 500 },
  nodes: {
    user: { x: 50, y: 200, size: 'large' },
    clawderous: { x: 300, y: 200, size: 'large' },
    providers: { x: 550, y: 200, size: 'large' },
    resend: { x: 750, y: 80, size: 'small' },
    sendgrid: { x: 750, y: 200, size: 'small' },
    postmark: { x: 750, y: 320, size: 'small' },
    handlers: { x: 550, y: 380, size: 'medium' },
    storage: { x: 300, y: 380, size: 'medium' },
  },
  nodeData: {
    user: { icon: 'User', name: 'User\nEmail', color: 'blue' },
    clawderous: { icon: 'Server', name: 'Clawderous\nEngine', color: 'violet' },
    providers: { icon: 'Database', name: 'Provider\nInterface', color: 'emerald' },
    resend: { icon: 'Mail', name: 'Resend', color: 'amber' },
    sendgrid: { icon: 'Mail', name: 'SendGrid', color: 'sky' },
    postmark: { icon: 'Mail', name: 'Postmark', color: 'rose' },
    handlers: { icon: 'Code', name: 'Command\nHandlers', color: 'orange' },
    storage: { icon: 'HardDrive', name: 'Storage\n(Convex)', color: 'zinc' },
  },
  connectors: [
    { from: 'user', to: 'clawderous', fromAnchor: 'right', toAnchor: 'left', style: 'email' },
    { from: 'clawderous', to: 'providers', fromAnchor: 'right', toAnchor: 'left', style: 'api' },
    { from: 'providers', to: 'resend', fromAnchor: 'bottom', toAnchor: 'top', style: 'api' },
    { from: 'providers', to: 'sendgrid', fromAnchor: 'bottom', toAnchor: 'top', style: 'api' },
    { from: 'providers', to: 'postmark', fromAnchor: 'bottom', toAnchor: 'top', style: 'api' },
    { from: 'providers', to: 'handlers', fromAnchor: 'bottom', toAnchor: 'top', style: 'call' },
    { from: 'handlers', to: 'storage', fromAnchor: 'left', toAnchor: 'right', style: 'save' },
  ],
  connectorStyles: {
    email: { color: 'blue', strokeWidth: 2, label: 'Email' },
    api: { color: 'emerald', strokeWidth: 2, label: 'API' },
    call: { color: 'amber', strokeWidth: 2, label: 'Process' },
    save: { color: 'zinc', strokeWidth: 2, label: 'Store' },
  },
}

export function ProviderDiagram() {
  return (
    <div style={{ width: '100%', height: '500px', background: '#0f172a', borderRadius: '12px', padding: '20px' }}>
      <ArcDiagram data={diagramData} />
    </div>
  )
}
