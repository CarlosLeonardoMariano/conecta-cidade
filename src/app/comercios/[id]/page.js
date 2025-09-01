// app/comercio/[id]/page.js
import { api } from "@/services/api";
import MiguelitoPizzaria from "@/components/comercios/miguelitoPizzaria";
import DungaoMotoPecas from "@/components/comercios/dungaoMotoPecas";


export default async function ComercioPage({ params }) {

  const resolvedParams = await params;
  const { id } = resolvedParams;
  const response = await api.get(`/comercio/${id}`);
  const comercio = response.data;
 
  

switch (comercio.id) {
  case "fbf5e2a0-097d-4d10-87d0-fb296df1934b": //MIGUELITO PIZZARIA
    return <MiguelitoPizzaria comercio={comercio} layoutEspecial={true} />


    case "1cf52e79-a6cb-4d25-8d56-f09e890498e6":
      return <DungaoMotoPecas comercio={comercio} layoutEspecial={true} />

 } 
}
