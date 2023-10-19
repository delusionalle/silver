import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export default async function ShapPlotPage() {
  const plotRes = await fetch('http://localhost:3000/api/shap/force', {
    method: 'GET',
  })

  const plotHtml = JSON.parse(await plotRes.text())[0]

  return (
    <DashboardShell>
      <div>
        <DashboardHeader
          heading="Shapley Force Plot"
          text="Влияние отдельных признаков на предсказания."
        />
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: plotHtml,
        }}
      ></div>
    </DashboardShell>
  )
}
