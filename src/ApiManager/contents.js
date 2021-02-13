import ApiCall from './ApiCall'

const contentModel = {

    getContent: (id,paramObj={}) => {
        return ApiCall.get(`contents/${id}`);
    },
    getContentBySlug: (slug,paramObj={}) => {
        return ApiCall.get(`contents/${slug}`);
    }
}

export default contentModel;