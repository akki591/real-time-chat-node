class Controller {
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
    this.insertData = this.insertData.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  async getAll(req, res) {
    // console.log(req.query);
    const response = await this.service.getAll(req.query);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async insert(req, res) {
    const response = await this.service.insert(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }

  async getOne(req, res) {
    const response = await this.service.getOne(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(200).send(response);
  }

  async insertData(data) {
    const response = await this.service.insert(data);
    return response;
  }

  async update(req, res) {
    const { id } = req.params;

    const response = await this.service.update(id, req.body);

    return res.status(response.statusCode).send(response);
  }

  async delete(req, res) {
    const { id } = req.params;

    const response = await this.service.delete(id);

    return res.status(response.statusCode).send(response);
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await this.service.get(id);

    return res.status(response.statusCode).send(response);
  }
}

export default Controller;
