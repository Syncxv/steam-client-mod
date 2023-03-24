import { Plugin } from '@src/types';
import { SwitchItem } from '@webpack/common';

export const Settings: React.FC = () => {
	return (
		<ul
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '1rem',
				listStyle: 'none',
				padding: '1rem'
			}}
		>
			{Object.values(steamed.Plugins.plugins).map((plugin, i) => (
				<li>
					<Plugin key={i} plugin={plugin} />
				</li>
			))}
		</ul>
	);
};

const Plugin: React.FC<{ plugin: Plugin }> = ({ plugin }) => {
	return (
		<SwitchItem
			style={{ margin: '0' }}
			label={plugin.name}
			description={plugin.description}
			onChange={(enable: boolean) =>
				enable ? steamed.Plugins.startPlugin(plugin) : steamed.Plugins.stopPlugin(plugin)
			}
			checked={plugin.started}
		/>
	);
};
