import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import Card from '../ui/Card'

const SkillChart = ({ data }) => {
    const chartData = [
        { name: 'Programming', value: data.programming, color: '#3b82f6' },
        { name: 'Frameworks', value: data.frameworks, color: '#8b5cf6' },
        { name: 'Tools', value: data.tools, color: '#10b981' },
        { name: 'Soft Skills', value: data.softSkills, color: '#f59e0b' },
    ]

    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="600">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Category Breakdown</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}

export default SkillChart