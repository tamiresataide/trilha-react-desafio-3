import { useNavigate  } from "react-router-dom";

import { useForm } from "react-hook-form";

import { MdPerson, MdEmail, MdLock } from 'react-icons/md';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { api } from '../../services/api';

import { Container, Title, Column, TitleLogin, SubtitleLogin, TermText, LinkLoginText, Text, Row, Wrapper } from './styles';

const Registration = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${ formData.email }&senha=${ formData.senha }`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            };

            alert('Usuário ou senha inválido');

        }catch(e){
            alert(`Não foi possivel continuar. (Erro: ${e})`);

        };

    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, 
                    dominar as principais tecnologias 
                    e entrar mais rápido nas empresas mais desejadas.
                </Title>

            </Column>

            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>

                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="Nome Completo"  control={control} />

                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />

                    { errors.email && <span>E-mail é obrigatório</span> }

                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />

                    { errors.senha && <span>Senha é obrigatório</span> }

                    <Button title="Cadastrar" variant="secondary" type="submit"/>

                </form>

                <TermText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</TermText>

                <Row>
                    <Text>Já tenho conta.</Text>

                    <LinkLoginText>Fazer login</LinkLoginText>

                </Row>

                </Wrapper>

            </Column>

        </Container>
    </>
    );

};

export { Registration };