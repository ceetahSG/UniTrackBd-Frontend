import {
  Bus,
  Activity,
  Gauge,
  Fuel,
  UsersRound,
  Clock3,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const fuelData = [
  { day: "Mon", liters: 312 },
  { day: "Tue", liters: 278 },
  { day: "Wed", liters: 395 },
  { day: "Thu", liters: 340 },
  { day: "Fri", liters: 420 },
  { day: "Sat", liters: 185 },
  { day: "Sun", liters: 160 },
];

const fleetBuses = [
  {
    id: "101-A",
    route: "Mirpur → Campus",
    status: "on-route",
    passengers: 34,
    capacity: 50,
    eta: "5 min",
    driver: "Rahim Uddin",
  },
  {
    id: "102-B",
    route: "Uttara → Campus",
    status: "on-route",
    passengers: 48,
    capacity: 50,
    eta: "12 min",
    driver: "Salam Khan",
  },
  {
    id: "103-C",
    route: "Dhanmondi → Campus",
    status: "on-route",
    passengers: 22,
    capacity: 40,
    eta: "8 min",
    driver: "Jamal Hossain",
  },
  {
    id: "104-B",
    route: "Campus → Gazipur",
    status: "on-route",
    passengers: 42,
    capacity: 50,
    eta: null,
    driver: "Karim Ali",
  },
  {
    id: "105-D",
    route: "Azimpur → Campus",
    status: "idle",
    passengers: 0,
    capacity: 40,
    eta: null,
    driver: "Faruk Mia",
  },
  {
    id: "106-E",
    route: "Tongi → Campus",
    status: "breakdown",
    passengers: 0,
    capacity: 50,
    eta: null,
    driver: "Hafiz Rahman",
  },
  {
    id: "107-F",
    route: "Narayanganj → Campus",
    status: "idle",
    passengers: 0,
    capacity: 40,
    eta: null,
    driver: "Noor Islam",
  },
  {
    id: "108-G",
    route: "Campus → Savar",
    status: "maintenance",
    passengers: 0,
    capacity: 50,
    eta: null,
    driver: "—",
  },
];

const statusCfg: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  "on-route": {
    label: "On Route",
    color: "text-[#22C55E]",
    bg: "bg-[#22C55E]/10",
    dot: "bg-[#22C55E]",
  },
  idle: {
    label: "Idle",
    color: "text-slate-400",
    bg: "bg-slate-700",
    dot: "bg-slate-400",
  },
  breakdown: {
    label: "Breakdown",
    color: "text-[#EF4444]",
    bg: "bg-[#EF4444]/10",
    dot: "bg-[#EF4444]",
  },
  maintenance: {
    label: "Maintenance",
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
    dot: "bg-[#8B5CF6]",
  },
};

const kpis = [
  {
    name: "Total Buses",
    value: "24",
    sub: "Fleet size",
    icon: Bus,
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
  },
  {
    name: "Active Trips",
    value: "9",
    sub: "Right now",
    icon: Activity,
    color: "text-[#22C55E]",
    bg: "bg-[#22C55E]/10",
  },
  {
    name: "Today's Mileage",
    value: "1,842 km",
    sub: "All routes combined",
    icon: Gauge,
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
  },
  {
    name: "Today's Fuel Usage",
    value: "420 L",
    sub: "Diesel consumed",
    icon: Fuel,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
  },
];

const operationsSnapshot = [
  {
    label: "Current Occupancy",
    value: "76%",
    detail: "149 of 196 seats filled",
    icon: UsersRound,
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    progress: 76,
  },
  {
    label: "On-time Performance",
    value: "92%",
    detail: "+4% compared with yesterday",
    icon: ShieldCheck,
    color: "text-[#22C55E]",
    bg: "bg-[#22C55E]/10",
    progress: 92,
  },
  {
    label: "Service Alerts",
    value: "2",
    detail: "1 breakdown · 1 maintenance",
    icon: AlertTriangle,
    color: "text-[#EF4444]",
    bg: "bg-[#EF4444]/10",
    progress: null,
  },
  {
    label: "Average Trip Time",
    value: "68 min",
    detail: "Across 9 active trips",
    icon: Clock3,
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
    progress: null,
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function FuelTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-white font-bold text-sm">{payload[0].value} L</p>
    </div>
  );
}

export function AdminDashboard() {
  const todayIdx = 4; // Friday highlighted

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.name}
            className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 h-[122px] w-full flex items-start justify-between"
          >
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                {kpi.name}
              </p>
              <h3 className="text-white text-2xl font-bold mt-1.5 leading-none">
                {kpi.value}
              </h3>
              <p className="text-slate-500 text-xs mt-1">{kpi.sub}</p>
            </div>
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg}`}
            >
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Fleet Status */}
        <div className="lg:col-span-1 bg-[#1E293B] border border-slate-800 rounded-2xl flex flex-col overflow-hidden w-full h-[430px]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Fleet Status</h3>
              <p className="text-slate-400 text-xs mt-0.5">
                {fleetBuses.length} vehicles
              </p>
            </div>
            {/* mini summary chips */}
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {[
                {
                  label: "On Route",
                  count: fleetBuses.filter((b) => b.status === "on-route")
                    .length,
                  color: "text-[#22C55E]",
                  bg: "bg-[#22C55E]/10",
                },
                {
                  label: "Idle",
                  count: fleetBuses.filter((b) => b.status === "idle").length,
                  color: "text-slate-300",
                  bg: "bg-slate-700",
                },
                {
                  label: "Other",
                  count: fleetBuses.filter(
                    (b) => b.status !== "on-route" && b.status !== "idle",
                  ).length,
                  color: "text-[#EF4444]",
                  bg: "bg-[#EF4444]/10",
                },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${chip.bg} ${chip.color}`}
                >
                  {chip.count} {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* Scrollable bus list */}
          <div className="divide-y divide-slate-800 overflow-y-auto h-[334px]">
            {fleetBuses.map((bus) => {
              const cfg = statusCfg[bus.status] ?? statusCfg["idle"];
              const occ =
                bus.capacity > 0
                  ? Math.round((bus.passengers / bus.capacity) * 100)
                  : 0;
              return (
                <div
                  key={bus.id}
                  className="px-5 py-3.5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-[#1A3C8F]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Bus className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold text-sm">
                        Bus {bus.id}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                        />
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs truncate mt-0.5">
                      {bus.route}
                    </p>
                    {bus.passengers > 0 && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${occ > 80 ? "bg-[#EF4444]" : occ > 60 ? "bg-[#F59E0B]" : "bg-[#22C55E]"}`}
                            style={{ width: `${occ}%` }}
                          />
                        </div>
                        <span className="text-slate-500 text-xs">
                          {bus.passengers}/{bus.capacity}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {bus.eta && (
                      <p className="text-[#F59E0B] text-xs font-semibold">
                        ETA {bus.eta}
                      </p>
                    )}
                    <p className="text-slate-500 text-xs mt-0.5">
                      {bus.driver}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Fuel Usage chart */}
        <div className="lg:col-span-2 bg-[#1E293B] border border-slate-800 rounded-2xl p-6 w-full h-[430px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">Weekly Fuel Usage</h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Diesel consumed per day (litres)
              </p>
            </div>
            <span className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-semibold px-3 py-1 rounded-full">
              Last 7 Days
            </span>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fuelData}
                margin={{ top: 22, right: 4, left: -16, bottom: 0 }}
                barCategoryGap="24%"
              >
                <defs>
                  <linearGradient
                    id="fuelBarGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient
                    id="todayFuelBarGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  key="grid"
                  strokeDasharray="3 3"
                  stroke="#334155"
                  vertical={false}
                />
                <XAxis
                  key="x-axis"
                  dataKey="day"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={8}
                />
                <YAxis
                  key="y-axis"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}L`}
                />
                <Tooltip
                  key="tooltip"
                  content={<FuelTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar
                  key="bar"
                  dataKey="liters"
                  radius={[8, 8, 2, 2]}
                  maxBarSize={42}
                >
                  <LabelList
                    dataKey="liters"
                    position="top"
                    fill="#94A3B8"
                    fontSize={10}
                    formatter={(value: number | string) => `${value}L`}
                  />
                  {fuelData.map((_, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={`url(#${i === todayIdx ? "todayFuelBarGradient" : "fuelBarGradient"})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-5 mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#3B82F6] inline-block" />
              <span className="text-slate-400 text-xs">Previous days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#F59E0B] inline-block" />
              <span className="text-slate-400 text-xs">Today</span>
            </div>
          </div>

          {/* Operations Snapshot */}
        </div>
      </div>
    </div>
  );
}
