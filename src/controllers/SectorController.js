const Setor = require('../models/Setor')

module.exports = {
	async listAllSectors(req, res){
		try {
			const sectors = await Setor.findAll({
				include: {
					association: 'usuarios'
				}
			})
			
			return res.status(200).json(sectors)
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}
}