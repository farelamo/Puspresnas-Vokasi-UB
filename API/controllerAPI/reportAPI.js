var Db = require("../../database/models")
var mhs = Db.mahasiswa
var jenisLomba = Db.jenisLomba
var Op = Db.Sequelize.Op

module.exports = {
    countData: async (req, res) => {
        try{ 
            var dateStart = req.body.dateStart
            var dateEnd = req.body.dateEnd

            var listDate = [];
            var awal = dateStart;
            var akhir = dateEnd;
            var dateMove = new Date(awal);
            var strDate = awal;

            while (strDate < akhir){
                var strDate = dateMove.toISOString().slice(0,10);
                listDate.push(strDate);
                dateMove.setDate(dateMove.getDate()+1);
            };
            console.log(listDate);

            var resultDate = []
            for(i = 0; i < listDate.length; i++){
                var tmp = {tanggal: {[Op.like]: `%${listDate[i]}%`}}
                resultDate.push(tmp)
            }
            await jenisLomba.findAll({where: {[Op.or]: resultDate}}) //jenisLomba
            .then(async data => {
                if(dateStart.length == 0 || dateEnd.length == 0){
                    res.status(400).send({
                        message: "Invalid !! body cant be empty !!"
                    })
                }else if(data.length < 1){
                    res.status(204).send('Data not found !!')
                }else {
                    console.log(data[0].id) 
                    var resultData = []
                    for(i = 0; i < data.length; i++){
                        var tmp = {jenis_lomba_id: {[Op.like]: `%${data[i].id}%`}}
                        resultData.push(tmp)
                    }
                    await mhs.findAll({where: {[Op.or]: resultData}}) //mahasiswa
                        .then(result => {
                            res.status(200).send({
                            message: "Successfully get data ! !",
                            data: result.length
                        })
                    }).catch(err => {
                            res.status(500).send({
                            message: err.message || 'Internal Service Error ! !'
                        })
                    }) 
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Internal Service Error ! !'
                })
            })
        }catch {
            res.status(500).send({
                message: 'Internal Service Error ! !'
            })
        }  
    }
}