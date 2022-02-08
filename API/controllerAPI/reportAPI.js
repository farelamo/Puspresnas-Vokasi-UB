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

            //convert bulan
            await jenisLomba.findAll({where: {[Op.or]: resultDate}}) //jenisLomba
            .then(async data => {
                // data ke 1 => bulan januari tanggal 2022-01-06, 3 siswa olivia
                // data ke 2 => bulan februari tanggal 2022-02-03, 4 siswa gemastik

                // console.log(data[0].tanggal)
                // const text = data[0].tanggal
                // const result = text.trim().split("-")
                // let d = result[1]
                // var haha = (d < 10) ? d.slice(1,2) : d
                // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                // let jadi = months[parseInt(haha) - 1]
                // console.log(jadi)
                // var hasilMonth = [
                    //januari, februari
                // ]
                //convert 2022-02-07 new Date Februari = 02 convert februari
                // const text = "2022-02-03"
                // const hsplit = text.split("-")
                // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                // let d = hsplit[1]
                // var haha = (d < 10) ? d.slice(1,2) : d
                // let jadi = months[parseInt(haha) - 1]
                // console.log(jadi)

                if(dateStart.length == 0 || dateEnd.length == 0){
                    res.status(400).send({
                        status: "false",
                        message: "Invalid !! body cant be empty !!"
                    })
                }else if(data.length < 1){
                    res.status(204).send('Data not found !!')
                }else {
                    var resultData = []
                    for(i = 0; i < data.length; i++){
                        var tmp = {jenis_lomba_id: {[Op.like]: `%${data[i].id}%`}}
                        resultData.push(tmp)
                    }
                    console.log(resultData) 
                    await mhs.findAll({where: {[Op.or]: resultData}}) //mahasiswa
                        .then(result => {
                            
                            // for(i = 0; i <= result.length; i++){
                            //     hasilMonth[0].push(result[0].length)
                            // }
                            
                            /*
                                hasilMonth = [
                                    {
                                        count: result[0], //3 siswa
                                        month: jadi[0] //januari
                                    },
                                    {
                                        count: result[1], // 4 siswa
                                        month: jadi[1] //February
                                    }
                                ]
                            */

                            // console.log(result[0].jenis_lomba_id)
                            res.status(200).send({
                            status: "true",
                            message: "Successfully get data ! !",
                            data: [
                                {
                                    count: 3,
                                    month: 'January'
                                },
                                {
                                    count: 4,
                                    month: 'February'
                                }
                            ]
                            // data: hasilMonth[0].push(result[0].length)
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